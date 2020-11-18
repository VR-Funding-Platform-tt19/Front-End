import React from "react";
import styled from "styled-components";

const sprintTeam = [
  {
    name: "Pedro Casuso",
    photo: "https://cmirza-images.s3-us-west-2.amazonaws.com/vr_head.png",
    unit: 4,
    info: "Some text that describes me lorem ipsum ipsum lorem.",
    contact: "example@example.com"
  },
  {
    name: "Kayode Richards",
    photo: "https://cmirza-images.s3-us-west-2.amazonaws.com/vr_head.png",
    unit: 3,
    info: "Some text that describes me lorem ipsum ipsum lorem.",
    contact: "example@example.com"
  },
  {
    name: "Christopher Corvo",
    photo: "https://cmirza-images.s3-us-west-2.amazonaws.com/vr_head.png",
    unit: 4,
    info: "Some text that describes me lorem ipsum ipsum lorem.",
    contact: "example@example.com"
  },
  {
    name: "Cameron Mirza",
    photo: "https://cmirza-images.s3-us-west-2.amazonaws.com/vr_head.png",
    unit: 4,
    info: "Some text that describes me lorem ipsum ipsum lorem.",
    contact: "example@example.com"
  }
];

const MeetTheTeamPage = styled.div`
  padding: 3em 5em 5em 5em;
  max-width: 100%;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  .card {
    width: 25em;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 2em;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.25);

    h2 {
      text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
    }

    p {
      margin: auto;
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;

const MeetTheTeam = () => {
  return (
    <MeetTheTeamPage>
      <h1 className="major">Meet The Team</h1>
      <FormWrapper>
        {sprintTeam.map(member => {
          return (
          <div className="card">
            <img src={member.photo} alt={member.name} />
            <div class="container">
            <h2>{member.name}</h2>
            <p class="unit">Unit {member.unit}</p>
            <p>{member.info}</p>
            <a href={member.contact}>{member.contact}</a>
            </div>
          </div>
          );
        })}
      </FormWrapper>
    </MeetTheTeamPage>
  );
};

export default MeetTheTeam;