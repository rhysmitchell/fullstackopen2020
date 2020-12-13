import React from "react";
import { Icon, SemanticCOLORS, Item } from "semantic-ui-react";
import { HealthCheckRating } from "../types";
import { HealthCheckEntry } from "../interfaces";

interface HealthCheckDataProps {
  entry: HealthCheckEntry;
}

const HealthCheckData: React.FC<HealthCheckDataProps> = (
  props: HealthCheckDataProps
): JSX.Element => {
  const { entry } = props;

  const heartColour = (rating: HealthCheckRating): SemanticCOLORS => {
    switch (rating) {
      case HealthCheckRating.CriticalRisk:
        return "red";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.LowRisk:
        return "yellow";

      default:
        return "green";
    }
  };

  return (
    <Item>
      <Item.Content>
        <Item.Description>
          <strong>Date: </strong>
          {entry.date}
          <Icon name="doctor" />
        </Item.Description>
        <Item.Description>
          <strong>Description: </strong>
          {entry.description}
        </Item.Description>
        <Item.Description>
          <strong>Health Rating: </strong>
          <Icon name="heart" color={heartColour(entry.healthCheckRating)} />
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

export default HealthCheckData;
