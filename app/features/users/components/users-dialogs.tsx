import { useAtomValue, useSetAtom } from "jotai";
import { UsersActionDialog } from "./users-action-dialog";
import { UsersDeleteDialog } from "./users-delete-dialog";
import { UsersInviteDialog } from "./users-invite-dialog";
import {
	currentUserRowAtom,
	toggleUsersDialogAtom,
	usersDialogAtom,
} from "./users-state";

export function UsersDialogs() {
	const open = useAtomValue(usersDialogAtom);
	const currentRow = useAtomValue(currentUserRowAtom);
	const setOpen = useSetAtom(toggleUsersDialogAtom);
	const setCurrentRow = useSetAtom(currentUserRowAtom);
	return (
		<>
			<UsersActionDialog
				key="user-add"
				open={open === "add"}
				onOpenChange={() => setOpen("add")}
			/>

			<UsersInviteDialog
				key="user-invite"
				open={open === "invite"}
				onOpenChange={() => setOpen("invite")}
			/>

			{currentRow && (
				<>
					<UsersActionDialog
						key={`user-edit-${currentRow.id}`}
						open={open === "edit"}
						onOpenChange={() => {
							setOpen("edit");
							setTimeout(() => {
								setCurrentRow(null);
							}, 500);
						}}
						currentRow={currentRow}
					/>

					<UsersDeleteDialog
						key={`user-delete-${currentRow.id}`}
						open={open === "delete"}
						onOpenChange={() => {
							setOpen("delete");
							setTimeout(() => {
								setCurrentRow(null);
							}, 500);
						}}
						currentRow={currentRow}
					/>
				</>
			)}
		</>
	);
}
