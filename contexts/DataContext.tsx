"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// App types (camelCase)
type Project = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo: string;
  dueDate: string;
  status: string;
};

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  projectId: string;
};

type Resource = {
  id: string;
  name: string;
  type: string;
  quantity: number;
  assignedTo: string;
};

type DataContextType = {
  projects: Project[];
  tasks: Task[];
  teamMembers: TeamMember[];
  events: Event[];
  resources: Resource[];
  loading: boolean;
  error: string | null;
  addProject: (project: Omit<Project, "id">) => Promise<void>;
  editProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  editTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  addTeamMember: (member: Omit<TeamMember, "id">) => Promise<void>;
  editTeamMember: (id: string, member: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  addEvent: (event: Omit<Event, "id">) => Promise<void>;
  editEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addResource: (resource: Omit<Resource, "id">) => Promise<void>;
  editResource: (id: string, resource: Partial<Resource>) => Promise<void>;
  deleteResource: (id: string) => Promise<void>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper functions to convert between camelCase and snake_case
const toSnakeCase = (obj: any): any => {
  const converted: any = {};
  for (const key in obj) {
    const snakeKey = key.replace(
      /[A-Z]/g,
      (letter) => `_${letter.toLowerCase()}`
    );
    converted[snakeKey] = obj[key];
  }
  return converted;
};

const toCamelCase = (obj: any): any => {
  const converted: any = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    converted[camelKey] = obj[key];
  }
  return converted;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [projectsRes, tasksRes, membersRes, eventsRes, resourcesRes] =
        await Promise.all([
          supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase
            .from("tasks")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase
            .from("team_members")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase
            .from("events")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase
            .from("resources")
            .select("*")
            .order("created_at", { ascending: false }),
        ]);

      if (projectsRes.error) throw projectsRes.error;
      if (tasksRes.error) throw tasksRes.error;
      if (membersRes.error) throw membersRes.error;
      if (eventsRes.error) throw eventsRes.error;
      if (resourcesRes.error) throw resourcesRes.error;

      setProjects(projectsRes.data.map(toCamelCase));
      setTasks(tasksRes.data.map(toCamelCase));
      setTeamMembers(membersRes.data.map(toCamelCase));
      setEvents(eventsRes.data.map(toCamelCase));
      setResources(resourcesRes.data.map(toCamelCase));
    } catch (err: any) {
      setError(err.message);
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Projects CRUD
  const addProject = async (project: Omit<Project, "id">) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("projects")
        .insert([{ ...toSnakeCase(project), user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setProjects([toCamelCase(data), ...projects]);
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding project:", err);
    }
  };

  const editProject = async (id: string, project: Partial<Project>) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .update(toSnakeCase(project))
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      setProjects(projects.map((p) => (p.id === id ? toCamelCase(data) : p)));
    } catch (err: any) {
      setError(err.message);
      console.error("Error editing project:", err);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) throw error;
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting project:", err);
    }
  };

  // Tasks CRUD
  const addTask = async (task: Omit<Task, "id">) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([toSnakeCase(task)])
        .select()
        .single();

      if (error) throw error;
      setTasks([toCamelCase(data), ...tasks]);
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding task:", err);
    }
  };

  const editTask = async (id: string, task: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update(toSnakeCase(task))
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      setTasks(tasks.map((t) => (t.id === id ? toCamelCase(data) : t)));
    } catch (err: any) {
      setError(err.message);
      console.error("Error editing task:", err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) throw error;
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting task:", err);
    }
  };

  // Team Members CRUD
  const addTeamMember = async (member: Omit<TeamMember, "id">) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("Current user:", user); // Debug log

      if (!user) throw new Error("Not authenticated");

      console.log("Inserting with user_id:", user.id); // Debug log

      const { data, error } = await supabase
        .from("team_members")
        .insert([{ ...toSnakeCase(member), user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.log("Insert error:", error); // Debug log
        throw error;
      }

      setTeamMembers([toCamelCase(data), ...teamMembers]);
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding team member:", err);
    }
  };

  const editTeamMember = async (id: string, member: Partial<TeamMember>) => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .update(toSnakeCase(member))
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      setTeamMembers(
        teamMembers.map((m) => (m.id === id ? toCamelCase(data) : m))
      );
    } catch (err: any) {
      setError(err.message);
      console.error("Error editing team member:", err);
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setTeamMembers(teamMembers.filter((m) => m.id !== id));
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting team member:", err);
    }
  };

  // Events CRUD
  const addEvent = async (event: Omit<Event, "id">) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("events")
        .insert([{ ...toSnakeCase(event), user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setEvents([toCamelCase(data), ...events]);
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding event:", err);
    }
  };

  const editEvent = async (id: string, event: Partial<Event>) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("events")
        .update(toSnakeCase(event))
        .eq("id", id).eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      setEvents(events.map((e) => (e.id === id ? toCamelCase(data) : e)));
    } catch (err: any) {
      setError(err.message);
      console.error("Error editing event:", err);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);

      if (error) throw error;
      setEvents(events.filter((e) => e.id !== id));
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting event:", err);
    }
  };

  // Resources CRUD
  const addResource = async (resource: Omit<Resource, "id">) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("Current user:", user);

      if (!user) throw new Error("Not authenticated");

      const dataToInsert = { ...toSnakeCase(resource), user_id: user.id };
      console.log("Data being inserted:", dataToInsert); // ADD THIS LINE

      const { data, error } = await supabase
        .from("resources")
        .insert([dataToInsert])
        .select()
        .single();

      console.log("Insert result:", { data, error }); // ADD THIS LINE

      if (error) throw error;
      setResources([toCamelCase(data), ...resources]);
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding resource:", err);
    }
  };

  const editResource = async (id: string, resource: Partial<Resource>) => {
    try {
      const { data, error } = await supabase
        .from("resources")
        .update(toSnakeCase(resource))
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      setResources(resources.map((r) => (r.id === id ? toCamelCase(data) : r)));
    } catch (err: any) {
      setError(err.message);
      console.error("Error editing resource:", err);
    }
  };

  const deleteResource = async (id: string) => {
    try {
      const { error } = await supabase.from("resources").delete().eq("id", id);

      if (error) throw error;
      setResources(resources.filter((r) => r.id !== id));
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting resource:", err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        tasks,
        teamMembers,
        events,
        resources,
        loading,
        error,
        addProject,
        editProject,
        deleteProject,
        addTask,
        editTask,
        deleteTask,
        addTeamMember,
        editTeamMember,
        deleteTeamMember,
        addEvent,
        editEvent,
        deleteEvent,
        addResource,
        editResource,
        deleteResource,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
