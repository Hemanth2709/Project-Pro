"use client"

import Link from "next/link"
import { BarChart3, Calendar, CheckSquare, Clock, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { useData } from "@/contexts/DataContext"
import { StatsSkeleton, CardGridSkeleton } from "@/components/skeleton"

export default function DashboardPage() {
  const { projects, tasks, teamMembers, events, loading } = useData()

  // Calculate stats
  const activeProjects = projects.filter(p => p.status === 'in-progress').length
  const pendingTasks = tasks.filter(t => t.status === 'todo' || t.status === 'in-progress').length
  const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length

  // Get recent projects (latest 3)
  const recentProjects = projects.slice(0, 3)

  // Calculate project progress
  const getProjectProgress = (projectId: string) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId)
    if (projectTasks.length === 0) return 0
    const completedTasks = projectTasks.filter(t => t.status === 'completed').length
    return Math.round((completedTasks / projectTasks.length) * 100)
  }

  // Get project task counts
  const getProjectTaskCounts = (projectId: string) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId)
    const completedTasks = projectTasks.filter(t => t.status === 'completed').length
    return { total: projectTasks.length, completed: completedTasks }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  // Get recent activity
  const getRecentActivity = () => {
    const recentTasks = [...tasks]
      .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
      .slice(0, 5)
    
    return recentTasks.map(task => {
      const project = projects.find(p => p.id === task.projectId)
      const member = teamMembers.find(m => m.id === task.assignedTo)
      return {
        task: task.title,
        project: project?.title || 'Unknown Project',
        assignee: member?.name || 'Unassigned',
        status: task.status,
        date: formatDate(task.dueDate)
      }
    })
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <BarChart3 className="h-6 w-6" />
              <span>ProjectPro</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/dashboard" className="text-sm font-medium text-primary">
                Dashboard
              </Link>
              <Link href="/projects" className="text-sm font-medium transition-colors hover:text-primary">
                Projects
              </Link>
              <Link href="/tasks" className="text-sm font-medium transition-colors hover:text-primary">
                Tasks
              </Link>
              <Link href="/team" className="text-sm font-medium transition-colors hover:text-primary">
                Team
              </Link>
              <Link href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
                Resources
              </Link>
            </nav>
            <UserNav />
          </div>
        </header>
        <div className="grid flex-1 md:grid-cols-[220px_1fr]">
          <aside className="hidden border-r bg-muted/40 md:block">
            <DashboardNav />
          </aside>
          <main className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <div className="flex items-center gap-2">
                <Link href="/projects/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </Link>
              </div>
            </div>

            {loading ? (
              <>
                <StatsSkeleton />
                <CardGridSkeleton />
              </>
            ) : (
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{activeProjects}</div>
                        <p className="text-xs text-muted-foreground">
                          {projects.length} total projects
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{pendingTasks}</div>
                        <p className="text-xs text-muted-foreground">
                          {tasks.length} total tasks
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{teamMembers.length}</div>
                        <p className="text-xs text-muted-foreground">
                          Active team members
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{upcomingEvents}</div>
                        <p className="text-xs text-muted-foreground">
                          {events.length} total events
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Projects and Activity */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                      <CardHeader>
                        <CardTitle>Recent Projects</CardTitle>
                        <CardDescription>
                          {projects.length === 0 
                            ? 'No projects yet. Create your first project!'
                            : `You have ${projects.length} project${projects.length !== 1 ? 's' : ''} currently`
                          }
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        {recentProjects.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>No projects found</p>
                            <Link href="/projects/new">
                              <Button className="mt-4" size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Project
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          recentProjects.map((project) => {
                            const { total, completed } = getProjectTaskCounts(project.id)
                            const progress = getProjectProgress(project.id)
                            return (
                              <Link key={project.id} href={`/projects/${project.id}`}>
                                <div className="flex flex-col gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h3 className="font-semibold">{project.title}</h3>
                                      <p className="text-sm text-muted-foreground line-clamp-1">
                                        {project.description}
                                      </p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      project.status === 'completed' ? 'bg-green-100 text-green-700' :
                                      project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                      'bg-gray-100 text-gray-700'
                                    }`}>
                                      {project.status}
                                    </span>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-muted-foreground">Progress</span>
                                      <span className="font-medium">{progress}%</span>
                                    </div>
                                    <Progress value={progress} />
                                  </div>
                                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>Due: {formatDate(project.endDate)}</span>
                                    <span>{completed}/{total} tasks</span>
                                  </div>
                                </div>
                              </Link>
                            )
                          })
                        )}
                      </CardContent>
                    </Card>

                    <Card className="col-span-3">
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates on your projects</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {tasks.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            <p className="text-sm">No tasks yet</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {getRecentActivity().map((activity, index) => (
                              <div key={index} className="flex flex-col gap-1 pb-4 border-b last:border-0">
                                <div className="flex items-start justify-between">
                                  <p className="text-sm font-medium">{activity.task}</p>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    activity.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {activity.status}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground">{activity.project}</p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>{activity.assignee}</span>
                                  <span>{activity.date}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Performance</CardTitle>
                      <CardDescription>Analysis of project progress and completion</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {projects.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>No projects to analyze</p>
                        </div>
                      ) : (
                        projects.slice(0, 5).map((project) => {
                          const progress = getProjectProgress(project.id)
                          return (
                            <div key={project.id} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-medium">{project.title}</div>
                                <div className="text-sm text-muted-foreground">{progress}%</div>
                              </div>
                              <Progress value={progress} />
                            </div>
                          )
                        })
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Reports</CardTitle>
                      <CardDescription>Detailed reports on project status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <div className="font-medium">Weekly Progress Report</div>
                          <div className="text-sm text-muted-foreground">
                            Summary of progress for all active projects during the last week
                          </div>
                          <Button variant="outline" size="sm" className="w-fit">
                            Download PDF
                          </Button>
                        </div>
                        <div className="grid gap-2">
                          <div className="font-medium">Resource Allocation Report</div>
                          <div className="text-sm text-muted-foreground">
                            Detailed analysis of resource allocation across all projects
                          </div>
                          <Button variant="outline" size="sm" className="w-fit">
                            Download PDF
                          </Button>
                        </div>
                        <div className="grid gap-2">
                          <div className="font-medium">Team Performance Report</div>
                          <div className="text-sm text-muted-foreground">
                            Evaluation of team member performance on projects
                          </div>
                          <Button variant="outline" size="sm" className="w-fit">
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}