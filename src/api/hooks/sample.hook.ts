import { get, post } from "../queries/sample.query";
import { QUERY_KEY } from "../utils/api.queryKey";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGet() {
  return useQuery({
    queryKey: [QUERY_KEY.SAMPLE_QUERY_KEY],
    queryFn: get,
  });
}

export function usePost() {
  return useMutation({
    mutationKey: [QUERY_KEY.SAMPLE_MUTATION_KEY],
    mutationFn: post,
  });
}
