import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "./../utils/api";
import SideBar from "./../components/SideBar";
import VideoCard from "./../components/VideoCard";

const Results = () => {
  const [videos, setVideos] = useState([]);

  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("search_query");

  useEffect(() => {
    api
      .get(`/search?query=${searchTerm}`)
      .then((res) => setVideos(res.data.data));
  }, [searchTerm]);

  return (
    <div className="flex gap-3">
      <SideBar />

      <div className="mx-auto overflow-auto w-full h-[90vh] p-4">
        <h2 className="text-xl mb-5">
          <span className="font-bold">{searchTerm}</span>
          <span> için sonuçlar</span>
        </h2>

        <div className="wrapper flex flex-col gap-5 justify-center ">
          {videos.map((item, index) => (
            <VideoCard isRow={true} key={index} video={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
