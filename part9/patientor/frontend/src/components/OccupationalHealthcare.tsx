import React from "react";
import { Icon, Item } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../interfaces";

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare: React.FC<OccupationalHealthcareEntryProps> = (
  props: OccupationalHealthcareEntryProps
): JSX.Element => {
  const { entry } = props;

  return (
    <Item>
      <Item.Content>
        <Item.Description>
          <strong>Date: </strong>
          {entry.date}
        </Item.Description>
        <Item.Description>
          <strong>Employer: </strong> <span>{entry.employerName}</span>
          <Icon name="stethoscope" />
        </Item.Description>
        <Item.Description>
          <strong>Description: </strong>
          {entry.description}
        </Item.Description>
        {entry.sickLeave && (
          <Item.Description>
            <strong>Sick Leave: </strong>
            <span>
              {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
            </span>
          </Item.Description>
        )}
      </Item.Content>
    </Item>
  );
};

export default OccupationalHealthcare;
