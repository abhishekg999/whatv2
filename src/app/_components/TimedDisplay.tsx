"use client";

import { useContext } from "react";
import { TimedMessageContext } from "../_contexts/TimedMessageContext";

export const TimedDisplay = () => {
  const { timedValue } = useContext(TimedMessageContext);
  return <div>{timedValue}</div>;
};
