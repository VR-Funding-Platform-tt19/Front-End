import React from "react";
import styled from "styled-components";

const sprintTeam = [
  {
    name: "Pedro Casuso",
    photo: "https://user-images.githubusercontent.com/7876859/99727956-853b7400-2a6d-11eb-83dc-64a13624dc4b.jpg",
    unit: 4,
    info: "Back End Development",
    github: "https://github.com/GoldenPedro"
  },
  {
    name: "Kayode Richards",
    photo: "https://user-images.githubusercontent.com/7876859/99727966-88cefb00-2a6d-11eb-9cfa-8fc9b55d2cdd.jpg",
    unit: 3,
    info: "Advanced Web Development",
    github: "https://github.com/kayode94"
  },
  {
    name: "Christopher Corvo",
    photo: "https://user-images.githubusercontent.com/7876859/99727974-8b315500-2a6d-11eb-8213-f8817e3a1930.jpg",
    unit: 3,
    info: "Advanced Web Development",
    github: "https://github.com/ChristopherCorvo"
  },
  {
    name: "Cameron Mirza",
    photo: "https://user-images.githubusercontent.com/7876859/99727976-8cfb1880-2a6d-11eb-9765-a7c5428536de.jpg",
    unit: 2,
    info: "Web Application Development",
    github: "https://github.com/cmirza"
  }
];

const MeetTheTeamPage = styled.div`
  padding: 3em 5em 5em 5em;
  max-width: 100%;
  h1 {
    text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  }
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
      margin-bottom: 0;
    }

    p {
      margin: auto;
    }
    a {
      text-align: center;
      height: 3em;
      border:none;
    }

    .githubIcon {
      max-width: 90%;
      max-height: 90%;
      filter: drop-shadow( 1px 1px 1px rgba(0, 0, 0, .7));
    }

    .headshot {
      max-width: 100%;
      max-height: 100%;
    }

    .githubLink{
      margin-top: 1em;
      display: flex;
      justify-content: center;
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
            <img className='headshot' src={member.photo} alt={member.name} />
              <div class="container">
              <h2>{member.name}</h2>
              <p class="unit">Unit {member.unit}</p>
              <p>{member.info}</p>
              <div className='githubLink'>
                <a href={member.github}><img className='githubIcon' src='https://user-images.githubusercontent.com/7876859/99728256-08f56080-2a6e-11eb-803f-921389362a0c.png' alt='github'/></a>
              </div>
            </div>
          </div>
          );
        })}
      </FormWrapper>
    </MeetTheTeamPage>
  );
};

export default MeetTheTeam;