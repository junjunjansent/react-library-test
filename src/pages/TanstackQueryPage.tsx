import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

type Combination = {
  combinationId: number;
  name: string;
  tag: string[];
};

type apiResult = {
  totalCount: number;
  pageSize: number;
  currentPAge: number;
  totalPages: 6;
  items: Combination[];
};

const axiosService = () => {
  return axios({
    method: "GET",
    url: "https://jellybellywikiapi.onrender.com/api/combinations",
    timeout: 5000,
  }).then((res) => res.data);
};

const TanstackQueryPage = () => {
  const { data, error } = useSuspenseQuery<apiResult>({
    queryKey: ["combinations"],
    staleTime: 1000 * 60 * 30, //refresh every 10s
    queryFn: axiosService,
  });

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>TanstackQueryPage with Axios</h1>
      <p>Note, sorry that I wont have POST example here.</p>

      {data?.items.map(({ combinationId, name, tag }) => (
        <article key={combinationId}>
          <h4>{name}</h4>
          <p>{tag.join(" ")}</p>
        </article>
      ))}

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
};

export default TanstackQueryPage;
