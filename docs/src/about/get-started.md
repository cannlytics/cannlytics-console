# Cannlytics

## Overview

PyMdown Extensions is a collection of extensions for Python Markdown. They were originally written to make writing
documentation more enjoyable. They cover a wide range of solutions, and while not every extension is needed by all
people, there is usually at least one useful extension for everybody.

## Usage

Cannlytics provides a user-friendly interface to quickly receive samples, perform analyses, collect and review results, and publish certificates of analysis (CoAs). There are also built in logistics, CRM (client relationship management), inventory management, and invoicing tools. The Cannlytics engine comes with **batteries included**, but you are always welcome to supercharge your setup with modifications and custom components.

This documentation explains Cannlytics' website architecture and how to build, develop, and publish the website. The website is live at <https://cannlytics.com>.

- [Introduction](#introduction)
- [Features](#features)
- [Road Map](#road-map)
- [Installation](#installation)
- [Authentication](#authentication)
- [Architecture](#architecture)
- [Development](#development)
- [Database](#database)
- [Storage](#storage)
- [Bugs](#bugs)
- [Testing](#testing)
- [Building](#building)
- [Publishing](#publishing)
- [Administration](#admin)
- [Resources](#resources)
- [Contributing](#contributing)
- [License](#license)

## 🏫 Introduction <a name="introduction"></a>

Cannlytics is a healthy mix of user friendly interfaces and software that you can use in your cannabis-testing lab. Users do not have to have any advanced knowledge and can jump in at any point. There are many advanced features that people with background in the web stack, Python, or your favorite programming language can jump right into.

The Cannlytics Website provides people with information about Cannlytics. The Cannlytics Engine is a mobile, desktop, and web app that provides administrators, laboratory staff, laboratory clients, and client integrators to interact with laboratory information.

## 🚀 Features <a name="features"></a>

* [Cannlytics App](https://cannlytics.com/app)
* [Cannlytics Assistant](https://cannlytics.com/assistant)
* [Cannlytics Beanstalk](https://cannlytics.com/beanstalk)
* [Cannlytics Command Line Interface](https://cannlytics.com/cli)
  -Resource: [Codeburst](https://codeburst.io/building-beautiful-command-line-interfaces-with-python-26c7e1bb54df)
* [Cannlytics OakHeart Authentication](https://cannlytics.com/authentication)
* [Cannlytics Portal](https://cannlytics.com/portal)
* [Cannlytics Website](https://cannlytics.com/website)
* [Cannlypedia](https://cannlytics.com/cannlypedia)

## 🗺️ Road Map <a name="road-map"></a>

TODO: Add features. Also;

* [Add video archive for events with Video.js](https://github.com/videojs/video.js)
* [Video.js Get Started](https://videojs.com/getting-started/)
* [Customize Error Pages](https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/#customize-the-default-error-views)
* [Experiment with App Engine](https://cloud.google.com/appengine/docs/flexible/python/quickstart#windows)
* [Add Google Cloud Armor](https://cloud.google.com/blog/products/identity-security/google-cloud-armor-features-to-protect-your-websites-and-applications?utm_source=release-notes&utm_medium=email&utm_campaign=2020-aug-release-notes-1-en)
* [Write custom Django commands](https://docs.djangoproject.com/en/3.1/howto/custom-management-commands/)
* Cannlytics Assistant (bot)
* Let users chose their own UTC time.

## 📖 Installation <a name="installation"></a>

Cannlytics is an open box and transparent. You do not have to guess about the software used in the Cannlytics Engine. Cannlytics is built and depends on the following software and services.

* [Python](https://www.python.org/psf/)
* [Django](https://www.djangoproject.com/foundation/)
* [Firebase](https://firebase.google.com/)
* [Google Cloud Platform](https://cloud.google.com/gcp)
* [Node.js](https://nodejs.org/en/about/)
* [Javascript, HTML, CSS](https://www.w3schools.com/)
* [Gimp](https://www.gimp.org/about/)
* [Inkscape](https://inkscape.org/about/)

Our philosophy is that open source and free solutions are the best.

> ["'Free' as in 'free speech,' not as in 'free beer.'"](http://www.gnu.org/philosophy/free-sw.html)

Developing the Cannlytics Engine requires installing the following tools:

* [Django](https://docs.djangoproject.com/en/3.1/intro/tutorial01)
* [Docker](https://docs.docker.com/get-docker/)
* [Firebase Tools](https://firebase.google.com/docs/cli)
* [Google Cloud SDK](https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe)
* [Node.js](https://nodejs.org/en/download/)

See [installation](/installation) for complete instructions. The installation instructions will guide you through:

* Cloning the Cannlytics Engine.
* Setting your account credentials.
* Installing Python and Python dependencies.
* Installing development tools.

For a quick start, simply clone the repository:

```shell
git clone https://github.com/cannlytics/cannlytics-website.git
```

## 🛡️ Authentication <a name="authentication"></a>

In Django, you can authenticate your Firebase app with [Pyrebase](https://github.com/thisbejim/Pyrebase) or in a custom manner.

Resources:

* [Firebase Custom Authentication System with Django](https://medium.com/@gabriel_gamil/firebase-custom-authentication-system-with-django-c411009ddb44)
* [Django with Google Firebase](https://hackanons.com/2018/03/python-django-with-google-firebase-getting-started-intro-basic-configuration-firebase-authentication-part1.html)

## 🏛️ Architecture <a name="architecture"></a>

The Cannlytics Website is built with [Python] using the [Django] framework. The Cannlytics Website runs on [Cloud Run] and is hosted with [Firebase Hosting]. The Cannlytics Website utilizes [Firebase Authentication], an optional SQL database, a [Firestore] NoSQL database for real-time data management, and [Firebase Storage] for file storage. The Cannlytics Engine has a user interface that is built with [Flutter] and [Dart] with a backend powered by [Python].

Cannlytics users can swap out components for others. For example, Cannlytics users can swap out [Leaf](https://lcb.wa.gov/mjtrace/-traceability-third-party-integrators) integration for [METRC](https://api-ca.metrc.com/Documentation/) integration. Separating your choice of each component from another, Cannlytics frees users to choose combinations that suits them, freeing administrators and developers to focus on their preferred area of specialization.

For backing services, the Cannlytics Website utilizes several Google Cloud service, including:

  * Containerized using [Cloud Build]
  * Uploaded to [Cloud Registry]
  * Runs as a stateless container on [Cloud Run]
  * *Optional* [Cloud SQL](https://cloud.google.com/sql) can be utilized if desired.
  * Additional [Cloud Storage](https://cloud.google.com/storage) buckets can be used for file storage.
  * [Cloud Secret Manager](https://cloud.google.com/secret-manager/) is used for storing configurations and keeping secrets secret.

Resources:

* [WSGI Servers](https://www.fullstackpython.com/wsgi-servers.html)

<!-- Architecture References: -->

  [Cloud Registry]: https://cloud.google.com/container-registry
  [Cloud Run]: https://firebase.google.com/docs/hosting/cloud-run
  [Dart]: https://dart.dev/guides
  [Django]: https://www.djangoproject.com/
  [Firebase Authentication]: https://firebase.google.com/docs/auth
  [Firebase Hosting]: https://firebase.google.com/docs/hosting
  [Firebase Storage]: https://firebase.google.com/docs/storage
  [Firestore]: https://firebase.google.com/docs/firestore
  [Futter]: https://flutter.dev/docs
  [Python]: https://www.python.org/

## 🔨 Development <a name="development"></a>

See [the development guide](https://cannlytics.com/docs/website/get-started) for a full-guide. Development can happen in many avenues. Principally, clone the repository, begin working on an area, referring to documentation as needed, and commit your changes.

## 📡 Database <a name="database"></a>

By default, Cannlytics operates with a NoSQL database, [Firebase](https://firebase.com), however, you can configure Cannlytics to function with any NoSQL or SQL database.

Resources:

* [Django Database API](https://docs.djangoproject.com/en/3.1/topics/db/queries/)

## 📁 Storage <a name="storage"></a>

Currently, the website utilizes Django's static file storage system with files stored in Cloud Build. The road map is to store files in Firebase Storage for easier management.

Resources:

* [Serving static files on App Engine](https://cloud.google.com/appengine/docs/standard/python3/serving-static-files)

## 🐞 Bugs <a name="bugs"></a>

See [issues](https://github.com/cannlytics/cannlytics-website/issues) for a full list of bugs and issues that you may encounter.

## ⚗️ Testing <a name="testing"></a>

Please see [the testing guide](https://cannlyitcs.com/docs/testing) for full documentation on Cannlytics software testing. Generally, you can run tests for an app with `python manage.py test app_name`.

The Cannlytics Website can be built locally for testing:

```shell
docker build . --tag gcr.io/cannlytics/cannlytics-website
gcloud auth configure-docker
docker push gcr.io/cannlytics/cannlytics-website
```

## 📚 Publishing <a name="publishing"></a>

See [the publishing guide](https://cannlytics.com/docs/website/publishing) for complete instructions on how to publish the Cannlytics Engine for use. Publishing is done with one command:

```shell
npm run publish
```

The build process contains three steps:

### 1. Containerize the app and upload it to Container Registry.

Build your container image using Cloud Build by running the following command from the directory containing the Dockerfile:

`gcloud builds submit --tag gcr.io/cannlytics/cannlytics-website`

### 2. Deploy the container image to Cloud Run.

`gcloud beta run deploy cannlytics-website --image gcr.io/cannlytics/cannlytics-website --region us-central1 --allow-unauthenticated --service-account=${GCS_SA}`

### 3. Direct hosting requests to the containerized app.

This step provides access to this containerized app from a [Firebase Hosting](https://firebase.google.com/docs/hosting) URL, so the app can generate dynamic content for the Firebase-hosted site.

`firebase deploy --only hosting:production`

## 🕵️ Administration <a name="admin"></a>

*Admin Site*

* Get an admin password with `gcloud secrets versions access latest --secret admin_password && echo ""`

*User Authentication*

Resources:

* [Django Admin Tutorial](https://docs.djangoproject.com/en/3.1/intro/tutorial07/)
* [Authenticating end users](https://cloud.google.com/run/docs/authenticating/end-users)
* [Authentication](https://cloud.google.com/run/docs/authenticating/public)
* [Google Cloud Authentication](https://google-auth.readthedocs.io/en/latest/user-guide.html)

## 🐕‍🦺 Resources <a name="resources"></a>

* [Django Philosophy](https://docs.djangoproject.com/en/3.1/misc/design-philosophies)
* [Django on Cloud Run](https://codelabs.developers.google.com/codelabs/cloud-run-django)
* [Firebase Storage in GCF](https://hackersandslackers.com/manage-files-in-google-cloud-storage-with-python/)
* [Design Tips](https://dribbble.com/stories/2020/04/22/designing-for-conversions-7-ux-tips-ecommerce?utm_campaign=2020-05-05&utm_medium=email&utm_source=courtside-20200505)
* [Docker Tips](https://twg.io/blog/things-i-wish-i-knew-about-docker-before-i-started-using-it/)
* [Testing Docker Locally](https://cloud.google.com/run/docs/testing/local)
* [The Python Runtime for the App Engine Flexible Environment](https://cloud.google.com/appengine/docs/flexible/python/runtime)
* [Quickstart for Python in the App Engine Flexible Environment](https://cloud.google.com/appengine/docs/flexible/python/quickstart#windows)

## 🤝 Contributing <a name="contributing"></a>

Contributions are always welcome! You are encouraged to submit issues, functionality, and features that you want to be addressed. See [the contributing guide](https://github.com/cannlytics/cannlytics/blob/master/contributing.md) to get started. Anyone is welcome to contribute anything. Currently, Cannlytics would love:

* Art;
* More code;
* More documentation;
* Ideas.

## 📜 License <a name="license"></a>

Made with 💖 by Cannlytics.

Except where otherwise noted, copyright © 2021 Cannlytics.

[GNU General Public License](http://www.gnu.org/licenses/gpl-3.0.html)
