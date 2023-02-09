#! /usr/bin/env sh
#
# deploy.sh
# Copyright (C) 2023 sandvich <sandvich@artix>
#
# Distributed under terms of the GPLv3 license.
#


npm run build && rsync -r --delete --progress dist/ pi:~/web/cyd/
