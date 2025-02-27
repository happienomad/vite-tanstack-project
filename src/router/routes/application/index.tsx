import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/application/")({
    component: () => <>This is  homepage</>
})