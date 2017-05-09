class Task < ApplicationRecord
  has_many :sub_tasks, class_name: 'Task', foreign_key: 'parent_id', primary_key: 'id'
  belongs_to :parent_task, class_name: 'Task', foreign_key: 'parent_id', primary_key: 'id'

  def as_json(options = { })
    task = super(options)
    task[:url] = Rails.application.routes.url_helpers.task_path(self)
    task
  end
end
