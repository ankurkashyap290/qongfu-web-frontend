import React, { useEffect } from "react";
import { NextPage } from "next";
import _ from "lodash";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";
import Onboarding from "../components/UserOnboarding";
import { userOnboardingNavLinks } from "../config";
import { setUserOnboardingStep } from "../redux/actions/user";
import AppPageContext from "../redux/lib/AppPageContext";

interface Props {
  statusCode: number;
}

const UserOnboarding: NextPage<Props> = ({ statusCode }) => {
  const router = useRouter();
  useEffect(() => {
    if (statusCode === 404) {
      router.push("/404");
    }
  }, [statusCode]);
  return (
    <Container>
      <Onboarding />
    </Container>
  );
};

UserOnboarding.getInitialProps = async (ctx: AppPageContext): Promise<Props> => {
  const slug = ctx.query.slug ? ctx.query.slug.toString() : "";
  const statusCode = userOnboardingNavLinks.includes(slug) ? 200 : 404;
  ctx.store.dispatch(setUserOnboardingStep(slug));
  return {
    statusCode,
  };
};

export default UserOnboarding;
