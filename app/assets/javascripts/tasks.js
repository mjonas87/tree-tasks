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
      $.ajax({
        url: '/tasks.json',
        success: function(res) {
          this.tasks = res;
        }.bind(this)
      });
    }
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
      updateTask: function () {
        $.ajax({
          method: 'PUT',
          data: {
            task: this.task,
          },
          url: '/tasks/' + this.task.id + '.json',
          success: function(res) {
            this.errors = {}
            this.task = res
            this.editMode = false
          }.bind(this),
          error: function(res) {
            this.errors = res.responseJSON.errors
          }.bind(this)
        });
      }
    }
  })
}
