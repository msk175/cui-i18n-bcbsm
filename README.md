# cui-i18n-jlr
JLR language overrides

## Quick Release Script

If you will be simply updating the release with minor additions from the Google sheet, you can simply run the following script and it will automatically do the things outlined in the manual steps below.

`./scripts/release 0.0.0 "commit message"`

Replace 0.0.0 with your next version number that you would like to release as and replace the commmit message with something appropriate.  Otherwise, if you are skeptical, review the actual script/release file and / or do the steps outlined below.

## Manually creating a new release

  1.  Update/add necessary files in the [CUI Translations (JLR IDM) google sheet](https://docs.google.com/spreadsheets/d/19a35v9oBH9190f5wmKvVy_WUPV0xelnKtDsRTEc87xk/edit#gid=0)
  2.  Run `mvn versions:set` and use a new patch/feature level version as necessary
  3.  Edit the ./scripts/build file and ensure the last line represents the updated version for the .jar file
  4.  Run `mvn versions:commit` to make sure there isn't any extra files in the project root
  5.  Run `./scripts/build` to create all of the new language files in the project.
  6.  Add the new/updated files to the git index `git add .`
  7.  Commit with an appropriate message `git commit -m "updated language bundle"
  8.  Update the NPM package `npm version patch`  or other npm version command as appropriate
  9.  Push the commit to the central repo with tags `git push origin master --tags`
 10.  Go to your JLR project and run `npm update` ... you should get the updated version.

Note: the version numbers reported during these operations may not make 100% sense because you are bouncing between both Maven versions and NPM versions.
