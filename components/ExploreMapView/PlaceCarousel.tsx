import React, { FunctionComponent } from "react";
import { Places } from "../../redux/actionTypes";
import useStyles from "../../Styles/components/carousel";
import PlaceCard from "../Cards/placeCard";
import { RightActiveArrow, LeftArrow } from "../CustomIcon";
import ItemsCarousel from "react-items-carousel";
import { Button } from "@material-ui/core";

interface Props {
  places: Places[];
  activeItemIndex: number;
  setActiveItemIndex: Function;
  isMobile?: boolean;
}

const PlaceCarousel: FunctionComponent<Props> = ({
  places,
  activeItemIndex,
  setActiveItemIndex,
}) => {
  const classes = useStyles();
  return (
    <div style={{ padding: "0 30px", maxWidth: 800, margin: "0 auto" }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        activePosition="center"
        numberOfCards={1}
        gutter={10}
        alwaysShowChevrons={true}
        leftChevron={
          <Button size="small" className={classes.chevronIconBtn}>
            <LeftArrow />
          </Button>
        }
        rightChevron={
          <Button size="small" className={classes.chevronIconBtn}>
            <RightActiveArrow />
          </Button>
        }
        outsideChevron={true}
        chevronWidth={30}
      >
        {places.map((item: Places, index: number) => {
          return (
            <div
              className={activeItemIndex === index ? classes.selectedSlide : classes.selectedSlide}
              key={`${item.id}-${index}`}
            >
              <PlaceCard data={item} carousel={true} />
            </div>
          );
        })}
      </ItemsCarousel>
    </div>
  );
};

export default PlaceCarousel;
