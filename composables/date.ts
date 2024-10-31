export function useDate() {
  const supabase = useSupabaseClient();

  async function fetchDates() {
    let { data: dates, error: error } = await supabase
      .from("Date")
      .select(`*, User ( lastname, firstname)`)
      .order("day", { ascending: true })
      .order("start", { ascending: true });

    return { dates, error };
  }

  async function fetchDate(id: number) {
    let { data: date, error } = await supabase
      .from("Date")
      .select("*")
      .eq("id", id)
      .single();

    return { date, error };
  }

  async function addDate(date: any) {
    const { data, error } = await supabase
      .from("Date")
      // @ts-ignore
      .insert([
        {
          day: date.day,
          start: date.start,
          end: date.end,
          user_id: date.userId,
        },
      ])
      .select();

    return { data, error };
  }

  async function updateDate(date: any, id: number) {
    const { data, error } = await supabase
      .from("Date")
      // @ts-ignore
      .update([
        {
          day: date.day,
          start: date.start,
          end: date.end,
          user_id: date.userId,
        },
      ])
      .eq("id", id)
      .select();

    return { data, error };
  }

  async function deleteDate(id: number) {
    const { error } = await supabase.from("Date").delete().eq("id", id);

    return { error };
  }

  return {
    fetchDates,
    fetchDate,
    addDate,
    updateDate,
    deleteDate,
  };
}
