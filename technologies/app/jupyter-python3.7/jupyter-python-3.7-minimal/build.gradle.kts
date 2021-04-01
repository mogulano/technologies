/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * Copyright 2019 Pierre Leresteux.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import com.bmuschko.gradle.docker.DockerRemoteApiPlugin
import com.saagie.technologies.SaagieTechnologiesGradlePlugin
import com.saagie.technologies.readDockerInfo
import com.saagie.technologies.getJacksonObjectMapper
import com.saagie.technologies.checkYamlExtension
import com.saagie.technologies.getVersionForDocker
import java.io.File

val nocache: String? by project
val python_version: String = "3.7"

apply<DockerRemoteApiPlugin>()
apply<SaagieTechnologiesGradlePlugin>()

tasks.withType(com.bmuschko.gradle.docker.tasks.image.DockerBuildImage::class) {
    this.noCache.set(nocache?.toBoolean() ?: true)
    this.buildArgs.put("PYTHON_KERNEL", python_version)
}

