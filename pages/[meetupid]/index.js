import React from "react";
import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDeatils = (props) => {
  return (
    <>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      ></MeetupDetail>
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://durgathev:123@cluster0.br9qdia.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const collectionname = db.collection("meetups");
  const meetup_Datas = await collectionname.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetup_Datas.map((meetup) => ({
      params: {
        meetupid: meetup._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupid = context.params.meetupid;

  const client = await MongoClient.connect(
    "mongodb+srv://durgathev:123@cluster0.br9qdia.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const collectionname = db.collection("meetups");
  const selectedData = await collectionname.findOne({
    _id: new ObjectId(meetupid),
  });
  client.close();
  return {
    props: {
      meetupData: {
        image: selectedData.image,
        address: selectedData.address,
        description: selectedData.description,
        title: selectedData.title,
        id: selectedData._id.toString(),
      },
    },
  };
}
export default MeetupDeatils;
