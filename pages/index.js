import React from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const dummy_meetups = [
  {
    id: "1",
    title: " First meetUp",
    image:
      "https://www.hdwallpapers.in/download/temple_in_water_with_reflection_bali_indonesia_pura_ulun_danu_bratan_during_sunset_hd_travel-HD.jpg",
    address: "somthing ",
    description: "This is a first meetup",
  },
  {
    id: "2",
    title: " second meetUp",
    image:
      "https://www.hdwallpapers.in/download/temple_in_water_with_reflection_bali_indonesia_pura_ulun_danu_bratan_during_sunset_hd_travel-HD.jpg",
    address: "somthing ",
    description: "This is a second meetup",
  },
];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetup</title>
        <meta name="description" content="browse the react next js meet ups" />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
};

// server side re-rendering

// export async function getServerSideProps(context) {
//   const request = context.req;
//   const response = context.res;
//   // calling api
//   return {
//     props: {
//       meetups: dummy_meetups,
//     },
//   };
// }

// static generation re-rendering

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://durgathev:123@cluster0.br9qdia.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const collectionname = db.collection("meetups");
  const meetup_Data = await collectionname.find().toArray();
  client.close();
  return {
    props: {
      // meetups: enga dummy_meetup um tharalam
      meetups: meetup_Data.map((meetup) => ({
        image: meetup.image,
        address: meetup.address,
        title: meetup.title,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // 10 sec
  };
}

export default HomePage;
