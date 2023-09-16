import React from "react";
import { Layout, QueryResult } from "../components";
import { gql, useQuery } from "@apollo/client";

import TrackCard from "../containers/track-card";
import { Track } from "../__generated__/graphql";

interface TracksData {
  tracksForHome: Track[];
}

const TRACKS = gql`
  query GetTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        name
        id
      }
    }
  }
`;

const Tracks = () => {
  const { loading, error, data } = useQuery<TracksData>(TRACKS);

  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome?.map((track, index) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
