import React, { FunctionComponent } from "react";
import { Grid, Card, CardContent, Typography, Divider } from "@material-ui/core";
import { ScheduleIcon } from "../CustomIcon";
import useStyles from "../../Styles/components/PlaceDetails/placeDetailCards";
import { Timing } from "../../redux/actionTypes";
import { getTimeToAmPmFormat } from "../../utils";
import { Week_Days } from "../../config";

interface Props {
  data: any[] | null;
  dayNumber: string;
  isMobile?: boolean;
  openToday?: any;
  mode?: string;
}

const WeeklySchedule: FunctionComponent<Props> = ({
  data,
  dayNumber,
  isMobile,
  openToday,
  mode = "",
}) => {
  const classes = useStyles();

  const renderWeeklyScheduleList = () => {
    return Week_Days.map((item, index) => {
      return (
        <Grid
          key={`${item.id!}-${index}`}
          item
          container
          className={item.id === dayNumber ? classes.weekDayActive : classes.weekDay}
        >
          <Grid item xs={4} xl={4} md={4} lg={4} sm={4}>
            {item.day}
          </Grid>
          <Grid
            item
            xs={8}
            xl={8}
            md={8}
            lg={8}
            sm={8}
            style={{ paddingLeft: "10px" }}
            className={classes.timingSpan}
          >
            {getWeeklyScheduleTiming(item.id, "list")}
          </Grid>
        </Grid>
      );
    });
  };

  const getWeeklyScheduleTiming = (id, type) => {
    const foundDays = data!.filter(item => parseInt(item.day) === parseInt(id));
    if (foundDays.length) {
      return foundDays.map((day, index) => {
        return (
          <span key={`day-schedule-${id}-${type}-${index}`}>{`|  ${getTimeToAmPmFormat(
            day.start
          )}-${getTimeToAmPmFormat(day.close)}`}</span>
        );
      });
    }
    return "-";
  };

  const renderMobileWeeklyScheduleList = () => {
    return data!.map((item: Timing, index: number) => {
      return (
        <div key={`${item.day!}-${index}`}>
          <Grid
            item
            container
            justify="space-between"
            className={item.day === dayNumber ? classes.weekDayActive : classes.weekDay}
          >
            <Grid item>{item.weekday}</Grid>{" "}
            <Grid item>
              {`${getTimeToAmPmFormat(item.start)}-${getTimeToAmPmFormat(item.close)}`}
            </Grid>
          </Grid>
          <Divider />
        </div>
      );
    });
  };

  return (
    <Card style={{ minWidth: "275px" }} className={mode === "inline" ? classes.mainCard : ""}>
      <CardContent>
        <div className={classes.hiddenSm}>
          <Typography variant="h5" component="h5" style={{ margin: "10px 0px" }}>
            Today
          </Typography>
          <div>
            {openToday !== false ? (
              <span className={classes.todayOpen}>
                <ScheduleIcon className={classes.scheduleIcon} /> Open Now
              </span>
            ) : (
              <span className={classes.todayClosed}>
                <ScheduleIcon className={classes.scheduleIconClosed} color="error" />
                Closed
              </span>
            )}
            <span className={classes.todayTime}>{getWeeklyScheduleTiming(dayNumber, "main")}</span>
          </div>
        </div>
        <Divider style={{ margin: "10px 0px" }} className={classes.hiddenSm} />
        <Grid container direction="column" className={classes.weekColumn}>
          <Grid item className={classes.hiddenSm}>
            <Typography variant="h5" component="h5">
              Weekly Schedule{" "}
            </Typography>
          </Grid>
          {!isMobile ? renderWeeklyScheduleList() : renderMobileWeeklyScheduleList()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeeklySchedule;
