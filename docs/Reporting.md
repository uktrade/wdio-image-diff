# Reporting

A report can be generated after the suite is executed.
Screenshots will only be linked to a test on failures.

## WDIO config file

Integration with wdio:

```
exports.config = {
  after: () => {
    browser.imageDiff.generateReport()
  },
}
```

The report will look something like:

![WDIO Image Diff Report](../report-example.png)
