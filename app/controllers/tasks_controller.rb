class TasksController < ApplicationController
  def index
    @tasks = Task.where(parent_task: nil)
    respond_to do |format|
      format.html
      format.json { render :json => @tasks.to_json(include: :sub_tasks) }
    end
  end

  def create
    @task = Task.new(task_params)
    respond_to do |format|
      format.json do
        if @task.save
          render :json => @task
        else
          render :json => { :errors => @task.errors.messages }, :status => 422
        end
      end
    end
  end

  def update
    @task = Task.find(params[:id])
    respond_to do |format|
      format.json do
        if @task.update(task_params)
          render :json => @task
        else
          render :json => { :errors => @task.errors.messages }, :status => 422
        end
      end
    end
  end

  def destroy
    Task.find(params[:id]).destroy
    respond_to do |format|
      format.json { render :json => {}, :status => :no_content }
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :description)
  end
end
