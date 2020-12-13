import React from "react";
import { HospitalEntry } from "../interfaces";
import { Icon, Item } from "semantic-ui-react";

interface HospitalEntryProps {
  entry: HospitalEntry;
}

const Hospital: React.FC<HospitalEntryProps> = (
  props: HospitalEntryProps
): JSX.Element => {
  const { entry } = props;

  return (
    <Item>
      <Item.Content>
        <Item.Description>
          <strong>Discharge Date: </strong>
          <Icon name="hospital" />
          {entry.discharge.date}: {entry.discharge.criteria}
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

export default Hospital;
