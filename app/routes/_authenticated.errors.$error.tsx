import { useParams } from "react-router";
import { ForbiddenError } from "@/features/errors/forbidden";
import { GeneralError } from "@/features/errors/general-error";
import { MaintenanceError } from "@/features/errors/maintenance-error";
import { NotFoundError } from "@/features/errors/not-found-error";
import { UnauthorisedError } from "@/features/errors/unauthorized-error";

const errorMap: Record<string, React.ComponentType> = {
	unauthorized: UnauthorisedError,
	forbidden: ForbiddenError,
	"not-found": NotFoundError,
	"internal-server-error": GeneralError,
	"maintenance-error": MaintenanceError,
};

export default function AuthenticatedErrorPage() {
	const { error } = useParams();
	const ErrorComponent = error ? errorMap[error] : undefined;

	return (
		<div className="flex-1 [&>div]:h-full">
			{ErrorComponent ? <ErrorComponent /> : <NotFoundError />}
		</div>
	);
}
