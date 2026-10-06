/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { GroupsAPI } from "../api";
import { Group } from "../types/groups";
import { toast } from "sonner";

export default function useGroups() {
    const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

  const getGroups = async () => {
    setLoading(true);
    try {
      const response = await GroupsAPI.GetAllGroups();
      setGroups(response.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    getGroups();
  }, []);

    return {
    groups,
    loading,
    getGroups,
    setGroups,
  }

  }
