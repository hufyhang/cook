<?php
header("Content-type: text/plain");
?>
{
<?php
echo '"name": "' . $_GET['name'] . '",';
?>
  "version": "0.0.1",
  "dependencies": {
    "grunt-cli": "latest",
    "grunt-contrib-concat": "latest",
    "grunt-contrib-uglify": "latest",
    "grunt-contrib-less": "latest",
    "grunt-contrib-watch": "latest"
  }
}

