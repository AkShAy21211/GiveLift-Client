import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ROLES } from "@/lib/types";

export default async function HomeRedirect() {
  const cookieStore = await cookies();
  const currentUser = cookieStore.get("currentUser")?.value;
  const role = currentUser ? JSON.parse(currentUser).role : null;

  if (role === ROLES.STATE_COORDINATOR) {
    redirect("/state/dashboard");
  } else if (ROLES.DISTRICT_COORDINATOR) {
    redirect("/district/dashboard");
  } else {
    redirect("/home");
  }
}
