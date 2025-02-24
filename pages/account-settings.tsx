import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import _ from "lodash";
import ExplorerLayout from "../components/Layout/ExplorerLayout";
import AccountSettings from "../components/AccountSettings";
import { setActiveSettingsTab } from "../redux/actions/user";
import { settingsNavLinks } from "../config";
import AppPageContext from "../redux/lib/AppPageContext";

interface Props {
  statusCode: number;
}

const Settings: NextPage<Props> = ({ statusCode }) => {
  const router = useRouter();

  useEffect(() => {
    if (statusCode === 404) {
      router.replace("/404");
    }
  }, []);

  return (
    <ExplorerLayout showHeroHeader={false} pageType="accountSettings">
      <AccountSettings />
    </ExplorerLayout>
  );
};

Settings.getInitialProps = async (ctx: AppPageContext): Promise<Props> => {
  const slug = ctx.query.slug ? ctx.query.slug.toString() : "";
  let statusCode = 200;
  if (ctx.isServer && ctx.store) {
    settingsNavLinks.includes(slug) ? (statusCode = 200) : (statusCode = 404),
      settingsNavLinks.includes(slug) ? "ok" : "Error";
    ctx.store.dispatch(setActiveSettingsTab(slug));
  }

  //@ts-ignore
  return {
    statusCode,
  };
};

export default Settings;
