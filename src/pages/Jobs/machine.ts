import { useQuery } from "react-query";
import { Machine } from "xstate";
import { assign } from "xstate/lib/actionTypes";
import { getRoutes } from "../../api/queries/routes";

const jobsMachine = Machine({
  id: "jobs",
  initial: "idle",
  context: {
    jobs: undefined,
    error: undefined,
  },
  states: {
    loading: {
      invoke: {
        id: "getJobs",
        src: () => useQuery("routes", getRoutes),
        onDone: {
          target: "success",
          actions: assign({ user: (context, event) => event.data }),
        },
        onError: {
          target: "failure",
          actions: assign({ error: (context, event) => event.data }),
        },
      },
    },
    loaded: {},
    failed: {},
  },
});

export default jobsMachine;
