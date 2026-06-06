import { useSetAtom } from "jotai";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleTasksDialogAtom } from "./tasks-state";

export function TasksPrimaryButtons() {
	const setOpen = useSetAtom(toggleTasksDialogAtom);
	return (
		<div className="flex gap-2">
			<Button
				variant="outline"
				className="space-x-1"
				onClick={() => setOpen("import")}
			>
				<span>Import</span> <Download size={18} />
			</Button>
			<Button className="space-x-1" onClick={() => setOpen("create")}>
				<span>Create</span> <Plus size={18} />
			</Button>
		</div>
	);
}
