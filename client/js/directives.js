/**
 * 
 *  Directives
 *      
 *  @author         Paweł Rostek
 *  @description    Directives
 *  
 */

myApp.directive('notificationUi', function (Notification) {
    return {
        scope: {
            nuiType: '@',
            nuiTitle: '@',
            nuiMessage: '@',
            nuiDelay: '@',
            nuiHtmlLink: '@'
        },
        link: function (scope, element, attrs) {

            var nuiType = angular.isUndefined(scope.nuiType) ? 'info' : scope.nuiType,
                    nuiTitle = angular.isUndefined(scope.nuiTitle) ? '' : scope.nuiTitle,
                    nuiMessage = angular.isUndefined(scope.nuiMessage) ? '' : scope.nuiMessage,
                    nuiDelay = angular.isUndefined(scope.nuiDelay) ? 1000 : scope.nuiDelay,
                    nuiLink = angular.isUndefined(scope.nuiHtmlLink) ? element.text() : scope.nuiHtmlLink,
                    nuiMessage = angular.isUndefined(scope.nuiHtmlLink) ? nuiMessage : element.html();

            var Notifydata = {message: nuiMessage, title: nuiTitle, delay: nuiDelay};

            element.html(nuiLink);

            element.bind('click', function () {

                if (nuiType == 'primary')
                    Notification(Notifydata);
                else if (nuiType == 'error')
                    Notification.error(Notifydata);
                else if (nuiType == 'success')
                    Notification.success(Notifydata);
                else if (nuiType == 'info')
                    Notification.info(Notifydata);
                else if (nuiType == 'warning')
                    Notification.warning(Notifydata);
                else
                    Notification.info(Notifydata);
            });
        }
    };

});