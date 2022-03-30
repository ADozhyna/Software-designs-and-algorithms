1. Identify SOLID Principles

    Choose a large open source project written in TypeScript preferably (choose another OOP language if you want: Java, C#, Ruby). You may want to look at [Angular](https://github.com/angular) or [VS Code](https://github.com/microsoft/vscode) source code. A project may be considered large enough if it contains at least 30 classes.

    Try to identify **at least 1 (one)** example of each SOLID principle. Document them by filling in the table below. Note that you don't need to give code examples itself, just provide the link to file with line numbers range (or whatever you want to clearly recognize the example you describe, e.g. file hello.ts:15-36, class Foo), you can also write free text.

    
     **Single Responsibility Principle**: [AnnouncmentBarComponent](https://github.com/angular/angular/blob/master/aio/src/app/custom-elements/announcement-bar/announcement-bar.component.ts). I think this component is a good example. It has only one responsibility. 
     [Logger](https://github.com/angular/angular/blob/master/aio/src/app/shared/logger.service.ts) servise is also good example of single responsibility principle
    
    **Open / Closed Principle**: [MirrorModel](https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/services/editorSimpleWorker.ts#L93) extends `BaseMirrorModel`. In `MirrorModel` class behavior was changed without changing base class.

    [handleError](https://github.com/angular/angular/blob/master/aio/src/app/shared/reporting-error-handler.ts#L21) method in `ReportingErrorHandler` looks like violation of Open/Closed principle
    
    **Liskov Substitution Principle**: [Run method](https://github.com/microsoft/vscode/blob/026e6239be90c9602ce1213f2538c0e0685196cb/src/vs/editor/browser/editorExtensions.ts#L376) in `MultiEditor` class extends the same method in base class with same parameters and output value
    
    **Interface Seggregation Principle** [IButton](https://github.com/microsoft/vscode/blob/main/src/vs/base/browser/ui/button/button.ts#L42) and [IActionViewItem](https://github.com/microsoft/vscode/blob/main/src/vs/base/browser/ui/actionbar/actionbar.ts#L16) interfaces are inherited from [IDisposable](https://github.com/microsoft/vscode/blob/main/src/vs/base/common/lifecycle.ts#L119) interface, so they both have `dispose` methot from `IDisposable` interface and their own methods          |
    
    **Dependency Inversion Principle** [RefCounterDisposable](https://github.com/microsoft/vscode/blob/main/src/vs/base/common/lifecycle.ts#L119) class depends on abstraction as `IDisposable` interface.           |
