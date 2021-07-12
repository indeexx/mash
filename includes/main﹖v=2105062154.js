function importFile(e, t, o) { if (0 != e.files.length) { var n = new FileReader;
        n.onload = function(e) { const o = e.target.result;
            FS.writeFile(t, new Uint8Array(o)) }, n.onloadend = o, n.readAsArrayBuffer(e.files[0]), e.value = "" } }

function js_reconstructionFinished() { document.getElementById("spinnerAnimate").style.display = "none", document.getElementById("spinnerInflateMode").style.display = "none" }

function js_reconstructionFailed() { document.getElementById("spinnerAnimate").style.display = "none", document.getElementById("spinnerInflateMode").style.display = "none", alert("Reconstuction failed or the canvas is empty.") }

function js_projectSaved() { const e = FS.readFile("/tmp/mm_project.zip"); var t = new Blob([e], { type: "application/zip" });
    saveAs(t, "mm_project.zip") }

function js_projectOpened() { resetToModuleState() }

function js_manipulationModeChanged(e) { switch (e) { default:
            case 0:
            $("#dropdownImageModeDraw").click(), $("#buttonDraw").focus(); break;
        case 1:
                $("#dropdownImageModeRedraw").click(), $("#buttonRedraw").focus(); break;
        case 2:
                $("#buttonInflateMode").click(), $("#buttonInflateMode").focus(); break;
        case 3:
                $("#buttonAnimate").click(), $("#buttonAnimate").focus() } }

function js_textureTemplateExported() { const e = FS.readFile("/tmp/mm_template.png"); var t = new Blob([e], { type: "image/png" });
    saveAs(t, "mm_template.png") }

function js_frameExportedToOBJ() { const e = FS.readFile("/tmp/mm_frame.obj"); var t = new Blob([e], { type: "model/obj" }); if (saveAs(t, "mm_frame.obj"), Module._hasTemplateImage() && Module._getTemplateImageVisibility()) { setTimeout((function() { const e = FS.readFile("/tmp/mm_frame.mtl"); var t = new Blob([e], { type: "model/mtl" });
            saveAs(t, "mm_frame.mtl") }), 100), setTimeout((function() { const e = FS.readFile("/tmp/mm_frame.png"); var t = new Blob([e], { type: "image/png" });
            saveAs(t, "mm_frame.png") }), 200) } }

function js_exportAnimationProgress(e) { var t = $("#exportAnimationProgress");
    t.text(e + "%"), t.css("width", e + "%") }

function js_exportAnimationFinished() { var e = $("#exportAnimationButtonExport"),
        t = $("#exportAnimationButtonCancel"),
        o = $("#exportAnimationProgress");
    e.removeClass("disabled"), e.prop("disabled", !1), t.addClass("disabled"), t.prop("disabled", !0), o.addClass("bg-success"); const n = FS.readFile("/tmp/mm_project.glb"); var i = new Blob([n], { type: "application/octet-stream" });
    saveAs(i, "mm_project.glb") }

function js_recordingModeStopped() { $(".buttonRecord").removeClass("active") }

function resetToModuleState() { $("#buttonRotate").removeClass("active"), Module._isMiddleMouseSimulationEnabled() && $("#buttonRotate").addClass("active"), $("#buttonShowControlPins").prop("checked", Module._getCPsVisibility()), $("#buttonShowTemplateImage").prop("checked", Module._getTemplateImageVisibility()), $("#buttonShowBackgroundImage").prop("checked", Module._getBackgroundImageVisibility()), $("#buttonUseTextureShading").prop("checked", Module._isTextureShadingEnabled()), $("#buttonEnableArmpitsStitching").prop("checked", Module._isArmpitsStitchingEnabled()), $("#buttonEnableNormalSmoothing").prop("checked", Module._isNormalSmoothingEnabled()); var e = $("input[name=buttonPlayPause][value=" + Module._isAnimationPlaying() + "]");
    $("input[name=buttonPlayPause]").parent().parent().removeClass("active"), e.parent().parent().addClass("active"), e.prop("checked", !0), $(".buttonRecord").removeClass("active") }

function showRecordButton() { $(".buttonRecord").removeClass("disabled"), $(".buttonRecord div input").prop("disabled", !1) }

function hideRecordButton() { $(".buttonRecord").removeClass("disabled"), $(".buttonRecord").addClass("disabled"), $(".buttonRecord div input").prop("disabled", !0) }

function showAnimationModeControls() { $(".animationButtons label").removeClass("disabled"), $(".animationButtons label div input").prop("disabled", !1), $("#buttonRotate").hasClass("active") ? hideRecordButton() : showRecordButton(), $("#buttonExportAnimation").removeClass("disabled") }

function hideAnimationModeControls() { $(".animationButtons label").removeClass("disabled"), $(".animationButtons label").addClass("disabled"), $(".animationButtons label div input").prop("disabled", !0), $("#buttonExportAnimation").removeClass("disabled"), $("#buttonExportAnimation").addClass("disabled") }

function showGeometryModeControls() { $(".buttonsViewOptions div label").removeClass("disabled"), $(".buttonsViewOptions div label input").prop("disabled", !1), $(".buttonsViewOptions button").removeClass("disabled"), $(".buttonsViewOptions button").prop("disabled", !1), $("#buttonExportAsOBJ").removeClass("disabled") }

function hideGeometryModeControls() { $(".buttonsViewOptions div label").removeClass("disabled"), $(".buttonsViewOptions div label").addClass("disabled"), $(".buttonsViewOptions div label input").prop("disabled", !0), $(".buttonsViewOptions button").removeClass("disabled"), $(".buttonsViewOptions button").addClass("disabled"), $(".buttonsViewOptions button").prop("disabled", !0), $("#buttonExportAsOBJ").removeClass("disabled"), $("#buttonExportAsOBJ").addClass("disabled") }

function exportAnimationPrerollFramesCheck(e) { const t = parseInt(e.attr("max")),
        o = parseInt(e.attr("min")),
        n = e.val();
    n > t ? e.val(t) : n < o && e.val(o) }

function handleResize() { var e = .5 * $(window).height() - $(".navbar").height() - .5 * $("canvas").height();
    e < 0 && (e = 0), $("canvas").css({ "margin-top": e + "px" }) }
$("#dropdownOpenProject").click((function() { $("#buttonOpenProject").click() })), $("#buttonOpenProject").change((function() { $("#buttonDraw").click(), importFile(this, "/tmp/projectOpened.zip", (function() { Module._openProject() })) })), $("#buttonSaveProject, #dropdownSaveProject").click((function() { Module._saveProject() })), $("#buttonExportTextureTemplate, #buttonExportTextureTemplateFileMenu").click((function() { Module._exportTextureTemplate() })), $("#buttonImportTemplateImage").change((function() { importFile(this, "/tmp/template.img", (function() { Module._loadTemplateImage(), $("#buttonShowTemplateImage").prop("checked", !0) })) })), $("#buttonImportBackgroundImage").change((function() { importFile(this, "/tmp/bg.img", (function() { Module._loadBackgroundImage(), $("#buttonShowBackgroundImage").prop("checked", !0) })) })), $(window).keydown((function(e) { $("div.modal").is(":visible") || (e.preventDefault(), 49 !== e.which && 97 !== e.which || $("#dropdownImageModeDraw").click(), 52 !== e.which && 100 !== e.which || $("#dropdownImageModeRedraw").click(), 50 !== e.which && 98 !== e.which || $("#buttonInflateMode").click(), 51 !== e.which && 99 !== e.which || $("#buttonAnimate").click(), 78 === e.which && $("#buttonNewProject").click(), 32 === e.which && $("input[name=buttonPlayPause]").not(":checked").click(), 69 === e.which && $("#buttonRecord").click(), 72 === e.which && $("#buttonShowControlPins").click(), e.ctrlKey && 79 === e.which && $("#buttonOpenProject").click(), e.ctrlKey && 83 === e.which && $("#buttonSaveProject").click(), e.ctrlKey && 67 === e.which && Module._copySelectedAnim(), e.ctrlKey && 86 === e.which && Module._pasteSelectedAnim(), e.ctrlKey && 65 === e.which && Module._selectAll(), 27 === e.which && Module._deselectAll(), (107 === e.which || 187 === e.which || e.shiftKey && 187 === e.which) && Module._offsetSelectedCpAnimsByFrames(1), 109 !== e.which && 189 !== e.which || Module._offsetSelectedCpAnimsByFrames(-1), 46 !== e.which && 8 !== e.which || Module._removeControlPointOrRegion()) })), $(".dropdownImageMode").click((function(e) { var t = this.id;
    $(".dropdownImageMode").removeClass("active"), $(this).addClass("active"), "dropdownImageModeRedraw" == t ? ($(".buttonImageMode").css("display", "none"), $("#buttonRedraw").css("display", "inline-block"), $("#buttonRedraw").click()) : "dropdownImageModeDraw" == t && ($(".buttonImageMode").css("display", "none"), $("#buttonDraw").css("display", "inline-block"), $("#buttonDraw").click()) })), $(".buttonMode").click((function(e) { var t = this.id;
    $(".buttonMode").removeClass("active"); var o = 0,
        n = Module._getManipulationMode(); "buttonDraw" == t ? (o = 0, hideAnimationModeControls(), hideGeometryModeControls()) : "buttonRedraw" == t ? (o = 1, hideAnimationModeControls(), hideGeometryModeControls()) : "buttonInflateMode" == t ? (n < 2 && $("#spinnerInflateMode").css("display", "inline-block"), o = 2, hideAnimationModeControls(), showGeometryModeControls()) : "buttonAnimate" == t && (n < 2 && $("#spinnerAnimate").css("display", "inline-block"), o = 3, showAnimationModeControls(), showGeometryModeControls());
    setTimeout((function() { Module._setManipulationMode(o); var e = Module._getManipulationMode();
        o != e && js_manipulationModeChanged(e) }), 50) })), $("#buttonNewProject, #buttonNewProjectFileMenu").click((function() { confirm("Do you want to start over from scratch?") && (Module._reset(), resetToModuleState(), js_manipulationModeChanged(Module._getManipulationMode())) })), $("#buttonRemove").click((function() { Module._removeControlPointOrRegion() })), $("#buttonRotate").change((function(e) { var t = $(this).hasClass("active");
    Module._enableMiddleMouseSimulation(t), $("#buttonAnimate").hasClass("active") && (t ? hideRecordButton() : showRecordButton()) })), $("#buttonResetView").click((function() { Module._resetView() })), $("#buttonShowControlPins").change((function() { Module._setCPsVisibility(this.checked) })), $("#buttonRecord").click((function() { Module._cpRecordingRequestOrCancel() })), $("input[name=buttonPlayPause]").change((function() { Module._toggleAnimationPlayback() })), $("#buttonShowHelp").click((function() { $(".tutorialVideos video").trigger("pause"), $(".tutorialVideos div").show(), $(".tutorialVideos video:first").trigger("play"), $(".tutorialVideos div:first").hide(), $(".tutorialVideos video").removeAttr("controls"), $(".tutorialVideos video:first").attr("controls", "controls"), /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) && $(".ctrl").text("Cmd"), $("#modalDialogQuickTutorial").modal() })), $("#buttonShowTemplateImage").click((function() { Module._setTemplateImageVisibility(this.checked) })), $("#buttonShowBackgroundImage").click((function() { Module._setBackgroundImageVisibility(this.checked) })), $("#buttonUseTextureShading").change((function() { Module._enableTextureShading(this.checked) })), $("#buttonShowSettings").click((function() { $("#modalDialogSettings").modal() })), $("input[type=radio][name=animRecordMode]").change((function() { Module._setAnimRecMode(this.value) })), $("#buttonTuneAnimation").click((function() { $("#modalDialogAnimationTuning").modal() })), $("#buttonEnableArmpitsStitching").change((function() { var e = Module._getManipulationMode(),
        t = "";
    e >= 2 && (t += (this.checked ? "Enabling" : "Disabling") + " this setting in animation mode requires recreation of the 3D model. "), this.checked && (t += "Note that this is an experimental feature that may cause Mash to crash and you may lose the current project. "), "" == t ? Module._enableArmpitsStitching(this.checked) : confirm(t + "Proceed?") ? (Module._enableArmpitsStitching(this.checked), e >= 2 && ($("#buttonDraw").click(), js_manipulationModeChanged(e))) : this.checked = !this.checked })), $("#buttonEnableNormalSmoothing").change((function() { Module._enableNormalSmoothing(this.checked) })), $(".tutorialVideos").click((function() { $(".tutorialVideos div").show(), $("div", this).hide(), $(".tutorialVideos video").trigger("pause"), $(".tutorialVideos video").removeAttr("controls"), $("video", this).attr("controls", "controls"), $("video", this).trigger("play") })), $(".examples").click((function() { if (confirm("Do you want to discard the current project and open this example?")) { $("#modalDialogQuickTutorial").modal("hide"); var e = $(this).data("exampleid");
        Module._openExampleProject(e) } })), $("#buttonSelectAll").click((function() { Module._selectAll() })), $("#buttonDeselectAll").click((function() { Module._deselectAll() })), $("#buttonCopyAnimation").click((function() { Module._copySelectedAnim() })), $("#buttonPasteAnimation").click((function() { Module._pasteSelectedAnim() })), $("#buttonExportAsOBJ").click((function() { Module._exportAsOBJ() })), $("#exportAnimationPrerollFrames").change((function() { exportAnimationPrerollFramesCheck($(this)) })), $("#buttonExportAnimation").click((function() { var e = $("#exportAnimationPrerollFrames"),
        t = $("#exportAnimationProgress"); const o = Module._getNumberOfAnimationFrames();
    e.attr({ min: "0", max: 5 * o }), exportAnimationPrerollFramesCheck(e), t.text(""), t.css("width", "0%"), t.removeClass("bg-success"), $("#exportAnimationNumFrames").text(o), $("#modalDialogExportAnimation").modal() })), $("#exportAnimationButtonExport").click((function() { var e = $("#exportAnimationPrerollFrames"),
        t = $("#exportAnimationProgress"),
        o = $("#exportAnimationButtonFull").prop("checked"),
        n = $("#exportAnimationPerFrameNormals").prop("checked"),
        i = $("#exportAnimationButtonExport"),
        a = $("#exportAnimationButtonCancel");
    i.addClass("disabled"), i.prop("disabled", !0), a.removeClass("disabled"), a.prop("disabled", !1), t.text(""), t.css("width", "0%"), t.removeClass("bg-success"), Module._exportAnimationStart(e.val(), o, n) })), $("#exportAnimationButtonCancel").click((function() { var e = $("#exportAnimationButtonExport"),
        t = $("#exportAnimationButtonCancel"),
        o = $("#exportAnimationProgress");
    e.removeClass("disabled"), e.prop("disabled", !1), t.addClass("disabled"), t.prop("disabled", !0), o.text(""), o.css("width", "0%"), Module._exportAnimationAbort() })), $("#modalDialogExportAnimation").on("hide.bs.modal", (function() { var e = !0; return Module._exportAnimationRunning() && (e = confirm("Are you sure you want cancel the export?")) && $("#exportAnimationButtonCancel").click(), e })), $("div.modal").on("show.bs.modal", (function() { Module._disableKeyboardEvents(), Module._pauseAnimation() })), $("div.modal").on("hide.bs.modal", (function() { Module._enableKeyboardEvents(), Module._resumeAnimation() })), $('#buttonShowHelp[data-tooltip="tooltip"]').tooltip({ trigger: "hover", delay: { show: 500, hide: 100 }, boundary: "window" }), $(window).resize(handleResize), $(window).on("mainContentVisible", (function() { $(".appVersion").text(Module._getVersion()), handleResize(); var e = $('#buttonShowHelp[data-tooltip="tooltip"]');
    setTimeout((function() { e.tooltip("show") }), 500), setTimeout((function() { e.tooltip("hide") }), 1e4), $("body").click((function() { $('[data-tooltip="tooltip"]').tooltip("hide") })) }));