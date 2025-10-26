// "use client";

// import type React from "react";

// import { useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Save, X } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { DatePicker } from "@/components/date-picker";
// import { DashboardNav } from "@/components/dashboard-nav";
// import { useData } from "@/contexts/DataContext";

// export default function NewProjectPage() {
//   const router = useRouter();
//   const { addProject } = useData();
//   const [projectData, setProjectData] = useState({
//     title: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//     status: "",
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setProjectData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = useCallback((name: string) => (value: string) => {
//     setProjectData((prev) => ({ ...prev, [name]: value }));
//   }, []);

//   const handleDateChange = (name: string) => (date: Date | undefined) => {
//     if (date) {
//       setProjectData((prev) => ({ ...prev, [name]: date.toISOString() }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     addProject(projectData);
//     router.push("/projects");
//   };

//   return (
//     <div className="flex min-h-screen flex-col">
//       {/* Header y navegación... */}
//       <div className="grid flex-1 md:grid-cols-[220px_1fr]">
//         <aside className="hidden border-r bg-muted/40 md:block">
//           <DashboardNav />
//         </aside>
//         <main className="flex flex-col gap-6 p-6">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <h1 className="text-3xl font-bold tracking-tight">
//               Nuevo Proyecto
//             </h1>
//             <div className="flex items-center gap-2">
//               <Link href="/projects">
//                 <Button variant="outline">
//                   <X className="mr-2 h-4 w-4" />
//                   Cancelar
//                 </Button>
//               </Link>
//             </div>
//           </div>

//           <Card>
//             <form onSubmit={handleSubmit}>
//               <CardHeader>
//                 <CardTitle>Información del Proyecto</CardTitle>
//                 <CardDescription>
//                   Ingresa los detalles básicos del nuevo proyecto
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="title">Nombre del Proyecto</Label>
//                   <Input
//                     id="title"
//                     name="title"
//                     value={projectData.title}
//                     onChange={handleInputChange}
//                     placeholder="Ingresa el nombre del proyecto"
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="description">Descripción</Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     value={projectData.description}
//                     onChange={handleInputChange}
//                     placeholder="Describe el proyecto y sus objetivos"
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div className="grid gap-2">
//                     <Label htmlFor="startDate">Fecha de Inicio</Label>
//                     <DatePicker onSelect={handleDateChange("startDate")} />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="endDate">Fecha de Finalización</Label>
//                     <DatePicker onSelect={handleDateChange("endDate")} />
//                   </div>
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="status">Estado</Label>
//                   <select
//                     id="status"
//                     name="status"
//                     value={projectData.status}
//                     onChange={handleInputChange}
//                     className="flex h-9 w-fit rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     <option value="">Selecciona el estado</option>
//                     <option value="planning">Planificación</option>
//                     <option value="in-progress">En Progreso</option>
//                     <option value="completed">Completado</option>
//                   </select>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <Button type="submit">
//                   <Save className="mr-2 h-4 w-4" />
//                   Guardar Proyecto
//                 </Button>
//               </CardFooter>
//             </form>
//           </Card>
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { DashboardNav } from "@/components/dashboard-nav";
import { useData } from "@/contexts/DataContext";

export default function NewProjectPage() {
  const router = useRouter();
  const { addProject } = useData();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = useCallback((name: string) => (value: string) => {
    setProjectData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleDateChange = (name: string) => (date: Date | undefined) => {
    if (date) {
      setProjectData((prev) => ({ ...prev, [name]: date.toISOString() }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(projectData);
    router.push("/projects");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header and navigation... */}
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <DashboardNav />
        </aside>
        <main className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              New Project
            </h1>
            <div className="flex items-center gap-2">
              <Link href="/projects">
                <Button variant="outline">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </Link>
            </div>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>
                  Enter the basic details of the new project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Project Name</Label>
                  <Input
                    id="title"
                    name="title"
                    value={projectData.title}
                    onChange={handleInputChange}
                    placeholder="Enter the project name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={projectData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the project and its objectives"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <DatePicker onSelect={handleDateChange("startDate")} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <DatePicker onSelect={handleDateChange("endDate")} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={projectData.status}
                    onChange={handleInputChange}
                    className="flex h-9 w-fit rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select status</option>
                    <option value="planning">Planning</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Project
                </Button>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
}