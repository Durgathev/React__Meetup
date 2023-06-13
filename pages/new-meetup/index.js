import React from "react";
import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

const NewMeetPage = () => {
  const router = useRouter();
  const meetuphandler = async (enteredData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.json();

    console.log(data);
    router.push("/");
  };
  return (
    <>
      <NewMeetupForm onAddMeetup={meetuphandler}></NewMeetupForm>
    </>
  );
};

export default NewMeetPage;
