import type React from "react"
import Link from "next/link"
import {
  Calendar,
  ChevronsUpDown,
  FileText,
  Home,
  Settings,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardNav({ className, ...props }: NavProps) {
  return (
    <nav className={cn("flex flex-col gap-2 p-4", className)} {...props}>
      <Link href="/dashboard">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>

      <Link href="/calendar">
        <Button variant="ghost" className="w-full justify-start">
          <Calendar className="mr-2 h-4 w-4" />
          Calender
        </Button>
      </Link>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <span className="flex items-center">
              <FileText className="mr-4 h-4 w-4" />
              Management
            </span>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6">
          <Link href="/projects">
            <Button variant="ghost" className="w-full justify-start">
              Projects
            </Button>
          </Link>
          <Link href="/tasks">
            <Button variant="ghost" className="w-full justify-start">
              Tasks
            </Button>
          </Link>
          <Link href="/team">
            <Button variant="ghost" className="w-full justify-start">
              Team
            </Button>
          </Link>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <span className="flex items-center">
              <Calendar className="mr-4 h-4 w-4" />
              Planning
            </span>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6">
          <Link href="/resources">
            <Button variant="ghost" className="w-full justify-start">
              Resources
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="ghost" className="w-full justify-start">
              Analytics
            </Button>
          </Link>
        </CollapsibleContent>
      </Collapsible>

      <Link href="/settings">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </Link>
    </nav>
  )
}