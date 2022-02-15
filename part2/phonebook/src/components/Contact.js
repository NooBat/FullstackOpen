import React from "react";

const Contact = ({ contacts }) => {
  const generateNames = (contacts) => {
    const newContacts = contacts.filter((person) => person.show)

    return newContacts.map((person) => {
      return <p key={person.id}>{person.name} {person.number}</p>
    })
  }

  return <div>{generateNames(contacts)}</div>;
};

export default Contact;
