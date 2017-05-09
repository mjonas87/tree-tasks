class Task < ApplicationRecord
  has_many :sub_tasks, class_name: 'Task', foreign_key: 'parent_id', primary_key: 'id'
  belongs_to :parent_task, class_name: 'Task', foreign_key: 'parent_id', primary_key: 'id'
end
