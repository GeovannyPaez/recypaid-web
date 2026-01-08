"use client";

import Header from "../../components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function DashboardLayout({ children }: Props) {
  return <DashboardShell>{children}</DashboardShell>;
}
