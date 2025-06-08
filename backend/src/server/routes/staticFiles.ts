import express, { Router } from "express";

export function staticFilesRoute(route: Router): void {
  route.use(express.static("public"));
}
