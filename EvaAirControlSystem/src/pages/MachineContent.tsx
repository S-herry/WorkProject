import StatusHeader from "../components/machine/StatusHeader";
import { CardItem } from "../components/store/machineType";
import DateGroup from "../components/machine/DateGroup";
import url from "../assets/data/url.json";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchInformationCard, queryClient } from "../util/http";

const MachineContent = () => {
  const initialCard: CardItem = useLoaderData();
  const { id } = useParams();
  const { t } = useTranslation();
  const [path, setPath] = useState("");

  useEffect(() => {
    if (id) {
      const test = url.test ? url.host : "";
      setPath(test + url.information.all.replace("{id}", id));
    }
  }, [id]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["InformationCard", id],
    queryFn: async ({ signal }) => {
      if (!path) return initialCard;
      const result = await fetchInformationCard({ url: path, signal });
      return result;
    },
    enabled: !!path,
    gcTime: 1000,
    refetchInterval: 1000,
    initialData: initialCard,
  });

  if (isPending) {
    return (
      <section className="bg-[#202020] rounded-lg w-full relative p-5">
        狀態關閉中
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-[#202020] rounded-lg w-full relative p-5">
        錯誤內容: {error?.message}
      </section>
    );
  }

  return (
    <section className="bg-[#202020] rounded-lg w-full relative p-5">
      <StatusHeader
        machineNumber={t(data?.json_key) ?? null}
        status={data?.status === "online"}
      />
      <hr className="flex shrink-0 mt-10 max-w-full h-px bg-white max-md:mt-10" />
      <div className="flex flex-col text-white mt-5 gap-5 relative">
        {data?.json_filed &&
          Object.keys(data.json_filed).map((key, index) => (
            <React.Fragment key={`${key}_${index}`}>
              {data.json_filed[key]?.menus && (
                <DateGroup
                  title={key}
                  subItems={data.json_filed[key]}
                  json_key={data.json_key}
                  current_stage={data.current_stage}
                />
              )}
            </React.Fragment>
          ))}
      </div>
    </section>
  );
};

export default MachineContent;

export async function Loader({ params }: LoaderFunctionArgs) {
  if (!params.id) return null;
  const path =
    (url.test ? url.host : "") + url.information.all.replace("{id}", params.id);
  return queryClient.fetchQuery({
    queryKey: ["InformationCard", params.id],
    queryFn: ({ signal }) => fetchInformationCard({ signal, url: path }),
  });
}

export async function Action({ request }: ActionFunctionArgs) {
  const path = (url.test ? url.host : "") + url.transfer_information.control;
  const data = await request.formData();
  const room = {
    room: data.get("room"),
    category: data.get("category"),
    menu: data.get("menu"),
    data: data.get("data"),
    id: data.get("dataId"),
    video: data.get("video"),
  };
  console.log(room);

  try {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(room),
    });

    if (!response.ok) {
      throw new Error("錯誤");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
