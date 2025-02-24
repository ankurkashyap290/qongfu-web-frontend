const express = require("express");
const next = require("next");
const proxy = require("http-proxy-middleware");
const dev = process.env.NODE_ENV === "development";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 4300;

app
  .prepare()
  .then(() => {
    const server = express();
    server.get("/places/:slug", (req, res) => {
      const slug = req.params.slug;
      const actualPage = "/place-details";
      const query = {
        slug,
        ...req.query,
      };
      app.render(req, res, actualPage, query);
    });

    server.get("/places", (req, res) => {
      const query = {
        ...req.query,
      };
      app.render(req, res, "/places", query);
    });

    // server.get("/lifestyle/:slug", (req, res) => {
    //   const slug = req.params.slug;
    //   const actualPage = "/lifestyle-details";
    //   const query = {
    //     slug,
    //     ...req.query,
    //   };
    //   app.render(req, res, actualPage, query);
    // });

    // server.get("/sign-in", (req, res) => {
    //   const pageType = "sign-in";
    //   const queryParams = req.query;
    //   const actualPage = "/auth";
    //   const query = {
    //     queryParams,
    //     pageType,
    //   };
    //   app.render(req, res, actualPage, query);
    // });

    // server.get("/sign-up", (req, res) => {
    //   const pageType = "sign-up";
    //   const queryParams = req.query;
    //   const actualPage = "/auth";
    //   const query = {
    //     queryParams,
    //     pageType,
    //   };
    //   app.render(req, res, actualPage, query);
    // });

    // server.get("/forgot-password", (req, res) => {
    //   const slug = req.params.slug;
    //   const queryParams = req.query;
    //   const actualPage = "/forgot-password";
    //   const query = {
    //     slug,
    //     queryParams,
    //   };
    //   app.render(req, res, actualPage, query);
    // });

    server.get("/user-onboarding", (req, res) => {
      const slug = req.params.slug;
      const queryParams = req.query;
      const actualPage = "/user-onboarding";
      const query = {
        slug,
        queryParams,
      };
      app.render(req, res, actualPage, query);
    });

    server.get("/user-onboarding/:slug", (req, res) => {
      const slug = req.params.slug;
      const queryParams = req.query;
      const actualPage = "/user-onboarding";
      const query = {
        slug,
        queryParams,
      };
      app.render(req, res, actualPage, query);
    });

    server.get("/settings/:slug", (req, res) => {
      const slug = req.params.slug;
      const actualPage = "/account-settings";
      const query = {
        slug,
        ...req.query,
      };
      app.render(req, res, actualPage, query);
    });

    server.get("/my-profile", (req, res) => {
      const slug = req.params.slug;
      const queryParams = req.query;
      const actualPage = "/my-profile";
      const query = {
        slug,
        queryParams,
      };
      app.render(req, res, actualPage, query);
    });

    server.get("/maps", (req, res) => {
      const query = {
        ...req.query,
      };
      app.render(req, res, "/explore-maps", query);
    });

    server.get("/explore", (req, res) => {
      const query = {
        ...req.query,
      };
      app.render(req, res, "/explore-search", query);
    });

    server.get("/", (req, res) => {
      const query = {
        ...req.query,
      };
      app.render(req, res, "/index", query);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`, `NODE_ENV is: '${process.env.NODE_ENV}'`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
