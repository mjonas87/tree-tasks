// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
window.onload = function () {
  var tasks = new Vue({
    el: '#tasks',
    data: {
      tasks: [],
      selectedTask: null,
      task: {
        name: 'conquer the world...',
        description: ''
      },
      errors: {}
    },
    mounted: function() {
      var that;
      that = this;
      $.ajax({
        url: '/tasks.json',
        success: function(res) {
          that.tasks = res;
        }
      });
    },
    methods: {
      // viewTask: function() {
      //   return
      // }
    }
  });

  tasks.$on('viewTask', function (task) {
    debugger;
    this.selectedTask = task
  });

  Vue.component('task-row', {
    template: '#task-row',
    props: {
      task: Object
    },
    data: function () {
      return {
        editMode: false,
        errors: {}
      }
    },
    methods: {
      // toggle the manager status which also updates the task in the database
      toggleManagerStatus: function () {
        this.task.manager = !this.task.manager
        this.updateTask()
      },
      // ajax call for updating an task
      updateTask: function () {
        var that = this;
        $.ajax({
          method: 'PUT',
          data: {
            task: that.task,
          },
          url: '/tasks/' + that.task.id + '.json',
          success: function(res) {
            that.errors = {}
            that.task = res
            that.editMode = false
          },
          error: function(res) {
            that.errors = res.responseJSON.errors
          }
        });
      },
      viewTask: function(task) {
        tasks.$emit('viewTask', task);
      }
    }
  })
}
