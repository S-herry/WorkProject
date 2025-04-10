import React, { useCallback, useEffect, useState } from "react";
import StatusHeader from "../components/machine/StatusHeader";
import { CardItem, Stage } from "../components/store/machineType";
import DateGroup from "../components/machine/DateGroup";
import url from "../assets/data/url.json";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { fetchInformationCard, queryClient } from "../util/http";

const MachineContent = () => {
  const initialCard: CardItem = useLoaderData();
  const { id } = useParams();
  const { t } = useTranslation();
  const [machine, setMachine] = useState(initialCard);
  const [status, setStatus] = useState(initialCard.status);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["InformationCard", id],
    queryFn: async ({ signal }) => {
      const host = url.test === true ? url.host : "";
      const path = host + url.information.all.replace("{id}", `${id}`);
      if (!path) throw new Error("Missing path");
      return fetchInformationCard({ url: path, signal });
    },
    enabled: status === "online",
    refetchInterval: 5000,
    initialData: initialCard,
    refetchOnWindowFocus: true, // 當頁面再次聚焦 會重新請求
  });

  useEffect(() => {
    if (data) {
      setMachine(data);
      setStatus(data.status);
    }
  }, [data]);

  const SetCurrent_stage = useCallback(
    ({ id, room, category, data }: Stage) => {
      if (status !== "online") return;
      setMachine((prev) => {
        return {
          ...prev,
          current_stage: {
            ...prev.current_stage,
            id: id,
            room: room,
            data: data,
            category: category,
          },
        };
      });
    },
    [status]
  );
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
        machineNumber={t(machine?.json_key) ?? null}
        status={machine?.status === "online"}
      />
      <hr className="flex shrink-0 mt-10 max-w-full h-px bg-white max-md:mt-10" />
      <div className="flex flex-col text-white mt-5 gap-5 relative">
        {machine?.json_filed &&
          typeof machine.json_filed === "object" &&
          Object.keys(machine.json_filed).map((key, index) => (
            <React.Fragment key={`${key}_${index}`}>
              {machine.json_filed[key]?.menus && (
                <DateGroup
                  title={key}
                  subItems={machine.json_filed[key]}
                  json_key={machine.json_key}
                  current_stage={machine.current_stage}
                  SetCurrent_stage={SetCurrent_stage}
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
  if (!params.id) return { json_key: "", status: "", json_filed: {} };
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
    id: data.get("id"),
    video: data.get("video"),
    volume: data.get("volume"),
  };
  console.log(`資料送入後端: ${JSON.stringify(room)}`);
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(room),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`錯誤: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("發生錯誤:", error);
    throw error;
  }
}
