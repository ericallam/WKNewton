//
//  ViewController.m
//  WKNewton
//
//  Created by Eric Allam on 15/11/2014.
//  Copyright (c) 2014 SwiftCrunch8. All rights reserved.
//

#import "ViewController.h"
#import <WebKit/WebKit.h>

@interface ViewController ()
@property (strong, nonatomic) WKWebView *webView;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    WKWebViewConfiguration *config = [WKWebViewConfiguration new];
    self.webView = [[WKWebView alloc] initWithFrame:self.view.bounds configuration:config];
    
    [self.view addSubview:self.webView];
    
    NSString *html = [NSString stringWithContentsOfFile:[NSBundle.mainBundle pathForResource:@"index" ofType:@"html"] encoding:NSUTF8StringEncoding error:nil];
    
    [self.webView loadHTMLString:html baseURL:[NSURL URLWithString:@"http://hunterloftis.github.io"]];
    
//    NSString *js = [NSString stringWithContentsOfFile:[NSBundle.mainBundle pathForResource:@"app" ofType:@"js"] encoding:NSUTF8StringEncoding error:nil];
//    
//    [self.webView evaluateJavaScript:js completionHandler:^(id result, NSError *error) {
//        NSLog(@"Result of evaling js: %@. Error %@", result, error);
//    }];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
