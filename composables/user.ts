import { PostgrestError } from "@supabase/postgrest-js";

export function useUser() {
  const supabase = useSupabaseClient();

  async function fetchUsers(): Promise<{
    users: User[] | null;
    error: PostgrestError | null;
  }> {
    let { data: users, error: error } = await supabase
      .from("User")
      .select("*")
      .order("created_at", { ascending: true });

    return { users, error };
  }

  async function fetchUser(
    id: number,
  ): Promise<{ user: User | null; error: any }> {
    let { data: user, error } = await supabase
      .from("User")
      .select("*")
      .eq("id", id)
      .single();

    return { user, error };
  }

  async function addUser(user: Partial<User>) {
    const { data, error } = await supabase
      .from("User")
      // @ts-ignore
      .insert<User>([{ firstname: user.firstname, lastname: user.lastname }])
      .select();

    return { data, error };
  }

  async function deleteUser(id: number) {
    const { error } = await supabase.from("User").delete().eq("id", id);

    return { error };
  }

  async function updateUser(user: Partial<User>, id: number) {
    const { data, error } = await supabase
      .from("User")
      // @ts-ignore
      .update<User>([{ firstname: user.firstname, lastname: user.lastname }])
      .eq("id", id)
      .select();

    return { data, error };
  }

  return {
    fetchUsers,
    fetchUser,
    addUser,
    updateUser,
    deleteUser,
  };
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
}
