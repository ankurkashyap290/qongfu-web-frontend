import React, { FunctionComponent } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import useStyles from "../../Styles/components/breadcrumbs";
import { RightInactiveArrow } from "../CustomIcon";

interface Data {
  linkName: string;
  href: string;
  active: boolean;
}

interface Props {
  data: Data[];
}
const QongfuBreadcrumbs: FunctionComponent<Props> = props => {
  const classes = useStyles();
  const { data } = props;
  return (
    <Breadcrumbs separator={<RightInactiveArrow />} aria-label="breadcrumb">
      {data.map((item: Data, index: number) => {
        return !item.active ? (
          <Link
            key={`${item.linkName}-${index}`}
            href={item.href}
            className={classes.breadcrumbLink}
          >
            {index === 0 ? <HomeIcon color="primary" className={classes.icon} /> : null}
            {item.linkName}
          </Link>
        ) : (
          <span key={`${item.linkName}-${index}`} className={classes.breadcrumbLinkActive}>
            {item.linkName}
          </span>
        );
      })}
    </Breadcrumbs>
  );
};

export default QongfuBreadcrumbs;
