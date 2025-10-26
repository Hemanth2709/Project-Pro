// Database types (snake_case - as stored in Supabase)
export type ProjectDB = {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  status: string
  created_at?: string
}

export type TaskDB = {
  id: string
  title: string
  description: string
  project_id: string
  assigned_to: string
  due_date: string
  status: string
  created_at?: string
}

export type TeamMemberDB = {
  id: string
  name: string
  email: string
  role: string
  created_at?: string
}

export type EventDB = {
  id: string
  title: string
  description: string
  date: string
  project_id: string
  created_at?: string
}

export type ResourceDB = {
  id: string
  name: string
  type: string
  quantity: number
  assigned_to: string
  created_at?: string
}

// App types (camelCase - as used in your app)
export type Project = {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: string
}

export type Task = {
  id: string
  title: string
  description: string
  projectId: string
  assignedTo: string
  dueDate: string
  status: string
}

export type TeamMember = {
  id: string
  name: string
  email: string
  role: string
}

export type Event = {
  id: string
  title: string
  description: string
  date: string
  projectId: string
}

export type Resource = {
  id: string
  name: string
  type: string
  quantity: number
  assignedTo: string
}