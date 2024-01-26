# pr-size

The PR-Size Action adds a label to a PR indicating the size of the PR.

# <Line>

**Overview:**

The size of the PR is determined by the number of additions to the PR.
  
|Number of Additions|Label|
|-------------------|-----|
|1 - 9|PR Size: XS|
|10 - 29|PR Size: S|
|30 - 99|PR Size: M|
|100 - 499|PR Size: L|
|500+|PR Size: XL|

# <Line>

**Details:**

* Required Input:
  * `GITHUB_TOKEN`
* Optional Input:
  * `exclude_specs`
    * Defaults to `false`.
    * Set to `true` to exclude files in spec or test directories.
  * `excluded_directories`
    * Defaults to an empty list.
    * Include a list of directory namees to exclude the additions made in those directories.
  * `label_color`
    * Defaults to `#fcffff`.
    * Include a HEX color code for a different color. All PR size labels will be the same color.

**Example Workflow**

