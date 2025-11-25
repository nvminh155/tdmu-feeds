import createClientForServer from "./server";

const getUser = async () => {
  const supabase = await createClientForServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

async function serverSignOut() {
  const supabase = await createClientForServer();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
    return false;
  }

  return true;
}

const SUPA = {
  getUser,
  serverSignOut,
};

export default SUPA;
